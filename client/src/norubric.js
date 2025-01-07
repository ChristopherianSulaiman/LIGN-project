import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Document, Packer, Paragraph, TextRun } from 'docx';

function NoRubric() {
    const [submissionFile, setSubmissionFile] = useState(null);
    const [rubricFile, setRubricFile] = useState(null);
    const [gradingData, setGradingData] = useState(null);
    const [editedData, setEditedData] = useState(null);
    const [msg, setMsg] = useState(null);

    const handleFileChange = (e, setFile) => {
        setFile(e.target.files[0]);
    };

    const handleEditChange = (index, field, value) => {
        const updatedData = [...editedData.csvData];
        updatedData[index][field] = field === 'grade' ? parseFloat(value) || 0 : value;
        const updatedOverallGrade = updatedData.reduce((sum, item) => sum + (parseFloat(item.grade) || 0), 0);
        setEditedData({ ...editedData, csvData: updatedData, overallGrade: updatedOverallGrade });
    };

    const saveAsDocx = async (data) => {
        const tableData = data.csvData.map(row => {
            return `Question: ${row.question}, Grade: ${row.grade}, Reason: ${row.reason}`;
        }).join('\n\n');

        const doc = new Document({
            sections: [
                {
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun(tableData),
                            ],
                        }),
                    ],
                },
            ],
        });
        const blob = await Packer.toBlob(doc);
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'GPT_Response.docx';
        link.click();
    };

    const handleSubmit = async () => {
        if (!rubricFile || !submissionFile) {
            setMsg('Please upload both files.');
            return;
        }

        const formData = new FormData();
        formData.append('rubric', rubricFile);
        formData.append('submission', submissionFile);

        setMsg('Uploading and processing...');
        try {
            const response = await axios.post('http://localhost:4000/grade', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const initialOverallGrade = response.data.csvData.reduce((sum, item) => sum + parseFloat(item.grade || 0), 0);
            setGradingData({ ...response.data, overallGrade: initialOverallGrade });
            setEditedData({ ...response.data, overallGrade: initialOverallGrade });
            setMsg('Grading complete!');
        } catch (error) {
            console.error('Error submitting files:', error);
            setMsg('Error during submission. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center py-10 px-5">
            <div className="mt-16 bg-[#FAF9F6]/90 shadow-md rounded-lg p-8 max-w-2xl w-full">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Grade Submission
                </h1>

                <div className="space-y-6">
                    <div>
                        <label
                            htmlFor="submissionFile"
                            className="block text-gray-700 font-semibold mb-2"
                        >
                            Upload Student Submission
                        </label>
                        <input
                            id="submissionFile"
                            type="file"
                            onChange={(e) => handleFileChange(e, setSubmissionFile)}
                            accept=".docx"
                            className="block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="rubricFile"
                            className="block text-gray-700 font-semibold mb-2"
                        >
                            Upload Grading Rubric
                        </label>
                        <input
                            id="rubricFile"
                            type="file"
                            onChange={(e) => handleFileChange(e, setRubricFile)}
                            accept=".docx"
                            className="block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <button
                        onClick={handleSubmit}
                        className="px-[35%] py-3 rounded-lg bg-[#25897a] text-[#FAF9F6] hover:bg-[#6BB1A6] hover:text-[#FAF9F6] transition font-medium text-sm z-10"
                        style={{
                            marginRight: '10px',
                            opacity: 0.8,
                        }}
                    >
                        Submit for Grading
                    </button>
                </div>

                {msg && (
                    <p className="mt-4 text-center text-gray-700 font-medium">
                        {msg}
                    </p>
                )}
            </div>

            {editedData && (
                <div className="bg-white shadow-md rounded-lg p-8 mt-10 w-full max-w-4xl">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                        Overall Grade: {editedData.overallGrade}
                    </h2>
                    <table className="w-full text-left border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Question</th>
                                <th className="border border-gray-300 px-4 py-2">Grade</th>
                                <th className="border border-gray-300 px-4 py-2">Reason</th>
                            </tr>
                        </thead>
                        <tbody>
                            {editedData.csvData.map((row, index) => {
                                // Ensure the grade is always treated as a string
                                const grade = typeof row.grade === "string" ? row.grade : `${row.grade}/5`; // Default to 5 as denominator
                                const [numerator, denominator] = grade.split("/");

                                return (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="border border-gray-300 px-4 py-2">
                                            {row.question}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <div className="flex items-center">
                                                <input
                                                    type="number"
                                                    value={numerator} // Editable numerator
                                                    onChange={(e) =>
                                                        handleEditChange(
                                                            index,
                                                            "grade",
                                                            `${e.target.value}/${denominator}`
                                                        )
                                                    }
                                                    className="w-16 border border-gray-300 rounded-md p-1 mr-1"
                                                />
                                                <span>/ {denominator}</span> {/* Static denominator */}
                                            </div>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <textarea
                                                value={row.reason}
                                                onChange={(e) =>
                                                    handleEditChange(index, "reason", e.target.value)
                                                }
                                                className="w-full border border-gray-300 rounded-md p-2"
                                                rows={Math.max(2, Math.ceil(row.reason.length / 60))} // Dynamic row size
                                                style={{ resize: "none" }} // Prevent manual resizing
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={() => saveAsDocx(editedData || gradingData)}
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition"
                        >
                            Download Full Response
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NoRubric;
