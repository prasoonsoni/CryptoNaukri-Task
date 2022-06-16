import React, { useState } from 'react'
import Loading from '../../components/loading/Loading';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
const BASE_URL = process.env.REACT_APP_BASE_URL

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Job = (props) => {
    const [loading, setLoading] = useState(false)
    const applicants = props.applicants
    const [snackbarStatus, setSnackbarStatus] = useState({ severity: "", open: false, message: "" })
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarStatus({ severity: "", open: false, message: "" })
    };
    const deleteJob = async () => {
        setLoading(true)
        const response = await fetch(`${BASE_URL}/job/${props.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": sessionStorage.getItem("auth-token")
            }
        });
        const json = await response.json();
        setLoading(false);
        if (json.success) {
            setSnackbarStatus({ open: true, message: json.message, severity: "success" })
        } else {
            setSnackbarStatus({ open: true, message: json.message, severity: "warning" })
        }
        setLoading(false);

    }
    return (
        <div className='job-card'>
            {loading && <Loading />}
            <Snackbar open={snackbarStatus.open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity={snackbarStatus.severity} sx={{ width: '100%' }}>
                    {snackbarStatus.message}
                </Alert>
            </Snackbar>
            <h1 className='job-title'>{props.title}</h1>
            <p className='job-description'>{props.description}</p>
            <p className='job-applicants' >{applicants.length} Applicants</p>
            <p className='job-salary' >Salary: {props.salary}</p>
            <i class="fa-solid fa-trash-can job-delete" onClick={deleteJob}></i>
        </div>
    )
}

export default Job