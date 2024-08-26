import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const AddReview = styled.form`
  background-color: #cac9c9;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 1rem;
  margin-bottom: 3rem;
  border-radius: 5px;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid gray;
  background-color: transparent;
  padding: 8px 10px;
  font-size: 1.1rem;
`;

const Button = styled.button`
  background-color: #3737ef;
  color: white;
  padding: 6px 12px;
  font-size: 1.2rem;
  border: none;
  border-radius: 10px;
`;

const Comment = styled.textarea`
  width: 200px;
  height: 100px;
  padding: 1rem;
  font-size: 1.1rem;
  border-radius: 5px;
`;

const Label = styled.label``;

const Field = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const File = styled.input`
  font-size: 1.1rem;
`;

function ReviewForm() {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !comment || !files) {
      alert("Please fill out all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("comment", comment);
    formData.append("date", new Date().toISOString());

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_REVIEW_URL as string, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting the review:", error);
      alert("Failed to submit review.");
    }
  };

  return (
    <AddReview onSubmit={handleSubmit}>
      <Field>
        <Label>Name</Label>
        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </Field>

      <Field>
        <Label>Comment</Label>
        <Comment value={comment} onChange={(e) => setComment(e.target.value)} />
      </Field>

      <Field>
        <Label>Images</Label>
        <File type="file" onChange={(e) => setFiles(e.target.files)} multiple />
      </Field>

      <Button type="submit">Add Review</Button>
    </AddReview>
  );
}

export default ReviewForm;
