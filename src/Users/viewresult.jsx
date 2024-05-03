import './userblogs.css'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import NavbarUser from './navbaruser';
import UserFooter from './userfooter';
const Viewresult = () => {
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
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
      
      function createData(
        Status: string,
        Marks: number,
        Accuracy: number,
        QualifyingPercentage: number,
        Percentage: number,
      ) {
        return { Status, Marks, Accuracy, QualifyingPercentage, Percentage };
      }
      
      const rows = [
        createData('Not Qualifyied ', 159, 6.0, 24, 4.0),
        createData('Qualifyied', 305, 3.7, 67, 4.3),
        createData('Not Qualifyied ', 159, 6.0, 24, 4.0),
        createData('Qualifyied', 305, 3.7, 67, 4.3),
        createData('Qualifyied', 305, 3.7, 67, 4.3),
        createData('Not Qualifyied ', 159, 6.0, 24, 4.0),
        createData('Qualifyied', 305, 3.7, 67, 4.3),
        createData('Qualifyied', 305, 3.7, 67, 4.3),
        createData('Not Qualifyied ', 159, 6.0, 24, 4.0),
        createData('Qualifyied', 305, 3.7, 67, 4.3),
      
      ];
    return (
        <div>
            <NavbarUser/>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5">
                        <h1>Strings</h1>
                        <div className="row mt-3">
                            <div className="col-6 col-sm-6 col-md-6 mt-1">
                                <h6>Time Spent</h6>
                                <b className="uma">2 mins, 30 sec</b>
                            </div>
                            <div className="col-6 col-sm-6 col-md-6 mt-1">
                                <h6>Marks</h6>
                                <b className="uma">5/20</b>
                            </div>
                            <div className="col-6 col-sm-6 col-md-6 mt-4">
                                <h6>Percentage</h6>
                                <b className="uma">25.00</b>
                            </div>
                            <div className="col-6 col-sm-6 col-md-6 mt-4">
                                <h6>Accuracy</h6>
                                <b className="uma">25.00</b>
                            </div>
                            <div className="col-6 col-sm-6 col-md-6 mt-4">
                                <h6>Status</h6>
                                <b className="uma">Not Qualifyied</b>
                            </div>
                            <div className="col-6 col-sm-6 col-md-6 mt-4">
                                <h6>Qualifying Percentage</h6>
                                <b className="uma">70.00%</b>
                            </div>
                        </div>
                        <div className='text-center mt-5'>
                            <button className='umabtn'>View Solutions</button>
                        </div>
                    </div>
                    <div className='col-md-6 mt-5 d-none d-md-block'>
                        <img src='https://img.freepik.com/premium-vector/businessman-catches-light-bulb-with-lasso-tiny-people-develop-creative-business-idea-innovation-project-team-analyzes-brainstorming-method-businessmen-solve-problems-find-solutions-with-teamwork_458444-1214.jpg' width={600} className='umaimg'/>
                        {/* <img src="https://res.cloudinary.com/learning-platform/image/fetch/dpr_auto,w_auto,f_auto,q_auto/https%3A%2F%2Fmedia-content.ccbp.in%2Fwebsite%2Fstatic-images%2Fplacement_corner_react_course_laptop.png" width={600} className='umaimg'/> */}
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='cloumn' >
                    <div className='mt-5 ' >
                    <TableContainer className="scroll-container1" component={Paper}>
                        <Table sx={{ minWidth: 900 }}  aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Status</StyledTableCell>
                                    <StyledTableCell align="right">Marks</StyledTableCell>
                                    <StyledTableCell align="right">Accuracy</StyledTableCell>
                                    <StyledTableCell align="center">Qualifying Percentage</StyledTableCell>
                                    <StyledTableCell align="center">Percentage</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow key={row.Status}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.Status}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.Marks}</StyledTableCell>
                                        <StyledTableCell align="right">{row.Accuracy}</StyledTableCell>
                                        <StyledTableCell align="center">{row.QualifyingPercentage}</StyledTableCell>
                                        <StyledTableCell align="center">{row.Percentage}</StyledTableCell>
                                        
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </div>
                    <div className='mt-5'>
                    <TableContainer className="scroll-container1" component={Paper}>
                        <Table sx={{ minWidth: 900 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                <StyledTableCell>Status</StyledTableCell>
                                    <StyledTableCell align="right">Marks</StyledTableCell>
                                    <StyledTableCell align="right">Accuracy</StyledTableCell>
                                    <StyledTableCell align="center">Qualifying Percentage</StyledTableCell>
                                    <StyledTableCell align="center">Percentage</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow key={row.Status}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.Status}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.Marks}</StyledTableCell>
                                    <StyledTableCell align="right">{row.Accuracy}</StyledTableCell>
                                    <StyledTableCell align="center">{row.QualifyingPercentage}</StyledTableCell>
                                    <StyledTableCell align="center">{row.Percentage}</StyledTableCell>
                                </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </div>
                </div>
            </div>
            <UserFooter/>
        </div>
    )
}

export default Viewresult;
