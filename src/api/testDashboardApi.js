//import dashboardApi from "C:\Masan\fullstack\msn-security-demo\msn-security-demo\src\api\dashboardApi.js";
import dashboardApi from "../api/dashboardApi.js";

console.log("Dashboard API initialized");

async function runDashboardApiTests() {
    try {
        console.log("Running dashboard API tests...");
        // Dữ liệu mẫu cho các bộ lọc
        const filters = {
            startDate: "2025-01-01",
            endDate: "2025-12-31",
            //keyword: "chinsu",
            //sentimentCategory: "positive",
            platformType: "Facebook",
            //isNegative: false,
            //severity: "low",
        };
        
        // Test fetchMentionsTrend
        console.log("Testing fetchMentionsTrend...");
        try {
        const response = await dashboardApi.fetchMentionsTrend(filters);
        console.log("Result from fetchMentionsTrend:", JSON.stringify(response,null, 2));
        } catch (error) {
            console.error("Error in fetchMentionsTrend:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
            }
        }
        // Test fetchOverallSentiment
        console.log("Testing fetchOverallSentiment...");
        try {
        const response = await dashboardApi.fetchOverallSentiment(filters);
        console.log("Result from fetchOverallSentiment:", JSON.stringify(response, null, 2));
        } catch (error) {
        console.error("Error running dashboard API tests:", error);
            console.error("Error in fetchOverallSentiment:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
            }
        }
        // Test fetchNegativePosts
        console.log("Testing fetchNegativePosts...");
        try {
        const response = await dashboardApi.fetchNegativePosts(filters);
        console.log("Result from fetchNegativePosts:", JSON.stringify(response, null, 2));
        } catch (error) {
            console.error("Error in fetchNegativePosts:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
            }
        }
        // Test fetchAllPosts
        console.log("Testing fetchAllPosts...");
        try {
        const response = await dashboardApi.fetchAllPosts(filters);
        console.log("Result from fetchAllPosts:", JSON.stringify(response, null, 2));
        } catch (error) {
            console.error("Error in fetchAllPosts:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
            }
        }
    } catch (error) {
        console.error("Error running dashboard API tests:", error);
    }

}
// Chạy các bài kiểm tra API
runDashboardApiTests();