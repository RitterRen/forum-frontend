import './App.css';
import Header from './components/Header';
import SignIn from './components/SignIn';
import { Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp';
import {PostDetail} from "./components/PostDetail";
import {Post} from "./Model/SharedModel/SharedModels";
import {useState} from "react";
import {ReplyForm} from "./components/PostDetail/ReplyForm";
import React from 'react';
import {MantineProvider} from "@mantine/core";

const postExample: Post = {
    id: "1",
    title: "Introduction to TypeScript",
    description: "This post provides an overview of TypeScript, including its benefits and how to get started.",
    user: {
        id: "user1",
        name: "Jane Doe",
        profileImage: "https://example.com/path/to/profile/image.jpg"
    },
    postDate: new Date("2024-02-04T10:00:00Z"),
    updateDate: new Date("2024-02-05T15:00:00Z"),
    attachments: [
        {
            id: "attachment1",
            type: "image",
            url: "https://example.com/path/to/image.jpg"
        },
        {
            id: "attachment2",
            type: "document",
            url: "https://example.com/path/to/document.pdf"
        }
    ],
    replies: [
        {
            id: "reply1",
            user: {
                id: "user2",
                name: "John Smith",
                profileImage: "https://example.com/path/to/another/profile/image.jpg"
            },
            message: "Great post 1, thanks for sharing!",
            date: new Date("2024-02-04T12:10:00Z")
        },
        {
            id: "reply2",
            user: {
                id: "user3",
                name: "Kevin Smith",
                profileImage: "https://example.com/path/to/another/profile/image.jpg"
            },
            message: "Great post 2, thanks for sharing!",
            date: new Date("2024-02-04T12:20:00Z")
        },
        {
            id: "reply3",
            user: {
                id: "user2",
                name: "John Lebron",
                profileImage: "https://example.com/path/to/another/profile/image.jpg"
            },
            message: "Great post 3, thanks for sharing!",
            date: new Date("2024-02-04T12:30:00Z")
        }
    ]
};

function App() {
    const [post,setPost] = useState<Post>(postExample)
    const handleNewReply = (message: string) => {
        // Update your post state with the new reply
        // Remember to handle both top-level replies and sub-replies appropriately
    };

  return (
      <React.StrictMode>
          <MantineProvider>
              <div className="App">
                  <Header/>
                  <Routes>
                      <Route path="/signUp" element={<SignUp />} />
                      <Route path="/signIn" element={<SignIn />} />
                      <Route path={"/postDetail/:id"} element={<PostDetail post={post} />}/>

                  </Routes>
              </div>
          </MantineProvider>

      </React.StrictMode>
  );
}

export default App;