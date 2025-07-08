import React, {useState, useEffect} from "react";
import { use } from "react";
import { getPosts } from "../services/api";

function PostList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const response = await getPosts();
                setPosts(response.data.data);
            } catch(err){
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadPosts();
    }, []);

}