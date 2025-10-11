import { useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const useTrackVisit = () => {
    useEffect(() => {
        const token = localStorage.getItem("jwt");

        // If user is logged in
        if (token) {
            const decoded = jwtDecode(token);
            const email = decoded.email;
            const name = decoded.name || "Unknown";

            const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
            const lastVisit = localStorage.getItem("lastVisit");

            if (lastVisit === today) {
                console.log("Already counted today.");
                return;
            }

            axios.post("http://localhost:5000/track-visit", { email, name })
                .then(res => {
                    console.log(res.data.message);
                    localStorage.setItem("lastVisit", today);
                })
                .catch(err => console.error("Visit tracking failed:", err));
        } else {
            // If user is not logged in, track as anonymous
            const today = new Date().toISOString().split('T')[0];
            const lastVisit = localStorage.getItem("lastVisit");

            if (lastVisit === today) {
                console.log("Anonymous visit already counted today.");
                return;
            }

            axios.post("http://localhost:5000/track-visit", { email: "", name: "Anonymous" })
                .then(res => {
                    console.log(res.data.message);
                    localStorage.setItem("lastVisit", today);
                })
                .catch(err => console.error("Anonymous visit tracking failed:", err));
        }
    }, []);
};

export default useTrackVisit;
