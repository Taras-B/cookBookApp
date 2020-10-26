import React from 'react'
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

type AlertProps = {
    // description: string
    onCloseAlert: () => void
}

export const CustomAlert: React.FC<AlertProps> = ({ onCloseAlert, children}) => {
    return (
        <div>
            <Snackbar open={true} onClose={onCloseAlert} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert variant="filled" severity="warning" onClose={onCloseAlert}>
                    {children}
                </Alert>
            </Snackbar>
        </div>
    )
}
