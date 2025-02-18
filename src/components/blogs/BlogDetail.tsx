import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Blog } from "../../types";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const Container = styled.div`
  margin: 50px auto;
  padding: 20px;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
  text-transform: capitalize;
`;

const Content = styled.p`
  font-size: 18px;
  color: #555;
  line-height: 1.6;
  text-align: justify;
`;

export const BlogDetail = () => {
    const { blogId } = useParams<{ blogId: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);

    const getBlog = async () => {
        try {
            const response = await fetch(`${API_URL}/posts/${blogId}`);
            if (!response.ok) throw new Error("Error fetching post");

            const data = await response.json();
            setBlog(data);
        } catch (error) {
            console.error("Error fetching post:", error);
        }
    };

    useEffect(() => {
        getBlog();
    }, [blogId]);

    return (
        <Container>
            {!blog ? (
                <h3>Loading...</h3>
            ) : (
                <>
                    <Title>{blog.title}</Title>
                    <Content>{blog.content}</Content>
                </>
            )}
        </Container>
    );
};
