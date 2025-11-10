import { useEffect } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const TrackVisit = () => {
    const { user } = useAuth();  // Logged-in user info
    const email = user?.email;  // User's email, if logged in

    useEffect(() => {
        const trackUserVisit = async () => {
            // Check if the user has already visited today (using localStorage)
            const todayVisit = localStorage.getItem("visitedToday");

            if (todayVisit) {
                console.log("User already visited today, no need to track again.");
                return;  // Skip tracking if user has already visited today
            }

            try {
                // Send visit tracking request to the server
                await axios.post("https://university-issue-management-system.vercel.app/track-visit", {
                    email: email || null,  // Send email if logged in, else null
                });

                // Mark user as visited today
                localStorage.setItem("visitedToday", "true");

                console.log("Visit tracked successfully.");
            } catch (error) {
                console.error("Error tracking visit:", error);
            }
        };

        trackUserVisit();  // Track the visit when the page is loaded

        return () => {
            // Clean up localStorage flag when the component is unmounted (optional)
            localStorage.removeItem("visitedToday");
        };
    }, [email]);  // Re-run if email changes

    return null;  // This component doesn't render anything
};

export default TrackVisit;
