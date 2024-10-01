import Link from "next/link";


const styles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
    flexDirection: 'column'
};

export default function NotFound() {
    return (
        <div style={styles}>
            <h1><u>Page Not Found!</u></h1>
            <p>Sorry, the page you are looking for does not exist.</p>

            <Link href="/">Back to Home Page</Link>
        </div>
    );
}