import { useNavigate } from "react-router-dom"

export const PageHeader = ({title, id} : {title: string, id: string}) => {
    const navigate = useNavigate()
    const onClick = () => {
        navigate('/')
    };
    return (
        <>
            <div style={styles.pageContainer}>
                <button onClick={onClick} style={styles.backBtn}>&larr; Back</button>
                <h1 style={styles.pageTitle}>{title}</h1>
                <p>ID: {id} </p>
            </div>
            <hr style={styles.hr} />
        </>
    )
}

const styles = {
    backBtn: {
        width: "100px",
        height: "40px",
        alignSelf: "center"
    },
    pageContainer: {
        display: "flex",
        margin: "13px 3px",
        borderRadius: "9px",
    },
    pageTitle: {
        margin: "0 20px",
        alignSelf: "center"
    },
    hr: {
        border: "3px solid #229091",
        borderRadius: "3px"
    }
}
