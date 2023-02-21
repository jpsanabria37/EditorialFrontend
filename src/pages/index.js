import fetch from 'node-fetch';
import Link from "next/link";
import Dashboard from "../../layouts/dashboard";

export default function Home({ cliente }) {
    return (
        <>
            <Dashboard></Dashboard>
        </>
    )
}