import { styles } from "./style";

type ErrorMessageProps = {
    errorMessage: string;
};

export default function ErrorMessage({ errorMessage }: ErrorMessageProps) {

    return (
        <p style={styles.error}>{errorMessage}</p>
    );
};