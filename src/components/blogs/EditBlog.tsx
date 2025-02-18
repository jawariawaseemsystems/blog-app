import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const Container = styled.div`
  width: 75%;
  margin: 50px auto;
  padding: 20px;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Title = styled.h2`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin: 10px 0 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  min-height: 150px;
  font-size: 16px;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 12px;
  background: #397bf6;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;

  &:hover {
    background: #5a92f8;
  }
`;

export const EditBlog = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_URL}/posts/${blogId}`);
        if (!response.ok) throw new Error("Failed to fetch post");

        const data = await response.json();
        setFormData({ title: data.title, content: data.content });
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [blogId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const form = { postId: parseInt(blogId!), title: formData.title, content: formData.content };
      const response = await fetch(`${API_URL}/edit/post`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Failed to update post");

      alert("Post updated successfully!");
      navigate(`/blogs/${blogId}`);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <Container>
      <Title>Edit Post</Title>
      <Form onSubmit={handleSubmit}>
        <Label>Title:</Label>
        <Input type="text" name="title" value={formData.title} onChange={handleChange} required />

        <Label>Content:</Label>
        <TextArea name="content" value={formData.content} onChange={handleChange} required />

        <Button type="submit">Save Changes</Button>
      </Form>
    </Container>
  );
};
