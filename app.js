require('dotenv').config();
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');
const pdfParse = require('pdf-parse');
const { PdfReader } = require('pdfreader');
const { createObjectCsvWriter } = require('csv-writer');
const csvParser = require('csv-parser');
const mammoth = require('mammoth');
const cors = require('cors');



const app = express();
const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.CHATGPT_API_KEY;

if (!OPENAI_API_KEY) {
    console.error('Error: CHATGPT_API_KEY is not set in the .env file.');
    process.exit(1);
}

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });


const upload = multer({ dest: 'uploads/' });
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
}));

const parseDocx = async (filePath) => {
    try {
        const result = await mammoth.extractRawText({ path: filePath });
        return result.value; 
    } catch (error) {
        throw new Error('Error parsing DOCX file: ' + error.message);
    }
};



app.post('/grade', upload.fields([{ name: 'rubric' }, { name: 'submission' }]), async (req, res) => {
    try {
        const { rubric, submission } = req.files;

        if (!rubric || !submission) {
            return res.status(400).send('Both rubric and submission files are required.');
        }


        const rubricContent = await parseDocx(rubric[0].path);
        const submissionContent = await parseDocx(submission[0].path);


        const prompt = `
            You are a grading assistant. STRICTLY using the provided rubric below, grade the student's submission below.
            Provide a detailed reasoning for each question's grade. You are allowed to give either full points, partial points, or no points at all
            depending on the rubric below. Please remember to always grade each student's answer based on the rubric with high accuracy.

            Rubric:
            ${rubricContent}

            Student's Submission:
            ${submissionContent}

            Provide the output in the following format:
            Question 1: Grade - X/10, Reason: [Reason]
            Question 2: Grade - X/10, Reason: [Reason]
            ...
            Overall Grade: X/(total grade possible) (Please always give this part in this exact format. It is important)
        `;


        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{ role: 'user', content: prompt }],
        });

        const gptResponse = response.choices[0].message.content;
        console.log('GPT Response:', gptResponse);


        const csvData = [];
        const gptLines = gptResponse.split('\n');


        gptLines.forEach((line) => {
            if (line.startsWith('Question')) {
                const questionMatch = line.match(/^(Question \d+)/);
                const gradeMatch = line.match(/Grade - ([^,]+)/);
                const reasonMatch = line.match(/Reason: (.+)$/);

                csvData.push({
                    question: questionMatch ? questionMatch[1].trim() : 'Unknown',
                    grade: gradeMatch ? gradeMatch[1].trim() : 'N/A',
                    reason: reasonMatch ? reasonMatch[1].trim() : 'Reason not provided',
                });
            }
        });


        const overallGradeMatch = gptResponse.match(/Overall\s*Grade:\s*(\d+)/i);

        const overallGrade = overallGradeMatch ? overallGradeMatch[1].trim() : null;

        if (!overallGrade) {
            console.error('Error: Could not extract overall grade from GPT response.');
            return res.status(500).send('Error extracting overall grade.');
        }



        const csvWriter = createObjectCsvWriter({
            path: 'uploads/grades.csv',
            header: [
                { id: 'question', title: 'Question' },
                { id: 'grade', title: 'Grade' },
                { id: 'reason', title: 'Reason' },
            ],
        });

        await csvWriter.writeRecords(csvData);


        // res.download(path.resolve('uploads/grades.csv'), 'grades.csv', (err) => {
        //     if (err) {
        //         console.error('Error sending file:', err);
        //         res.status(500).send('Error generating CSV.');
        //     }


        //     fs.unlinkSync(rubric[0].path);
        //     fs.unlinkSync(submission[0].path);
        // });

        res.json({
            overallGrade,
            csvData,
            gptResponse,
        });
    } catch (error) {
        console.error('Error processing grading:', error.message);
        res.status(500).send('Something went wrong while grading.');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


//USING docx instead of pdf => more accurate parsing.

//using gpt-4o instead of mini => WAY more accurate.
