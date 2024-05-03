import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation, useNavigate } from 'react-router-dom';
import apiList from '../../liberary/apiList';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Certificate from './certificate';
import { PDFViewer, BlobProvider } from '@react-pdf/renderer';
import { useRef } from 'react';

const Assessmentcertificationresult = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { Timelimit, timeLeft, CategoryTitle, userId, Modalname } = state || {};
    console.log(Timelimit, timeLeft)
    const [assessmentDetails, setAssessmentDetails] = useState([])
    useEffect(() => {
        const api = `${apiList.getTestcertificationDetails}/${userId}/${CategoryTitle}`;
        const fetchCardData = async () => {
            try {
                const response = await axios.get(api);
                setAssessmentDetails(response?.data);
                console.log(response?.data)
            } catch (e) {
                console.log("Error in Getting the Assessment Data", e);
            }
        };
        fetchCardData();
    }, [CategoryTitle]);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const percentage = assessmentDetails?.Score
        ? (assessmentDetails.Score / assessmentDetails.Questioncount) * 100
        : 0;

    const CertificateGenerator = ({ username, topic, percentage }) => {
        const pdfRef = useRef();

        const handleDownload = () => {
            pdfRef.current.updateContainer();
        };

        return (
            <div>
                <BlobProvider document={<Certificate username={username} topic={topic} percentage={percentage} />}>
                    {({ url }) => (
                        <div>
                            <PDFViewer width="1000" height="600">
                                <Certificate ref={pdfRef} username={username} topic={topic} percentage={percentage} />
                            </PDFViewer>
                            <a href={url} target="_blank" rel="noopener noreferrer">Download Certificate</a>
                        </div>
                    )}
                </BlobProvider>
            </div>
        );
    };

    const generateCertificate = () => {
        window.print();
        return false;
        if (!assessmentDetails || !assessmentDetails.userdetails || assessmentDetails.userdetails.length === 0) {
            return null;
        }

        const username = `${assessmentDetails.userdetails[0].FirstName} ${assessmentDetails.userdetails[0].LastName}`;
        const topic = CategoryTitle;
        const percentage = (assessmentDetails.Score / assessmentDetails.Questioncount) * 100;

        console.log(username, topic, percentage);

        return (
            <CertificateGenerator
                username={username}
                topic={topic}
                percentage={percentage}
            />
        );
    };

    return (
        <div style={{ backgroundColor: "rgb(235 235 232)", height: "100vh" }}>
            <div className="container">
                <div className="row">
                    <div className='col-md-3'></div>
                    <div className="col-md-6 mt-5 text-center">
                        <h1>Result</h1>
                        <h3>Topic:{CategoryTitle}</h3>
                        <div className="row mt-4">
                            <div className="col-6 col-sm-6 col-md-6 mt-1">
                                <h6>Time Spent</h6>
                                <b className="uma" style={{ color: "red" }}>{(Timelimit * 60 - timeLeft) > 60 ? (Timelimit * 60 - timeLeft) + 'Mins' : (Timelimit * 60 - timeLeft) + 'Secs'}</b>
                            </div>
                            <div className="col-6 col-sm-6 col-md-6 mt-1">
                                <h6>Marks</h6>
                                <b className="uma" style={{ color: "green" }}>{assessmentDetails.Score}</b>
                            </div>
                            <div className="col-6 col-sm-6 col-md-6 mt-4">
                                <h6>Status</h6>
                                <b className='uma' style={{ color: percentage.toFixed(2) > 80 ? 'green' : 'red' }}>{percentage.toFixed(2) > 80 ? 'Qualified' : 'Not Qualified'}</b>
                            </div>
                            <div className="col-6 col-sm-6 col-md-6 mt-4">
                                <h6>Qualifying Percentage</h6>
                                <b className="uma">{assessmentDetails.Score / assessmentDetails.Questioncount * 100} %</b>
                            </div>
                        </div>
                        <div className='text-center mt-5'>
                            <button onClick={generateCertificate}>Download Certificate</button>
                        </div>
                    </div>
                    <div className='col-md-3'></div>
                </div>
            </div>
            <div className='container table mt-4'>
                <div className='row'>
                    <div className='col-md-2'></div>
                    <div className='col-md-8 text-center'>
                        <table className='table-1' style={{ width: "1020px" }}>
                            <thead style={{ fontWeight: "500" }}>
                                <tr>
                                    <th>Status</th>
                                    <th>Marks Percentage</th>
                                    <th>Accuracy</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Qualifyied</td>
                                    <td>80-100</td>
                                    <td>80-100</td>
                                </tr>
                                <tr>
                                    <td>Not Qualifyied</td>
                                    <td>Below 80</td>
                                    <td>Below 80</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='col-md-2'></div>
                </div>
            </div>
        </div>
    )
}

export default Assessmentcertificationresult;
