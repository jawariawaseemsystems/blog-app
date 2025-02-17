import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Blog } from "../../types";
import styled from "styled-components";

const API_URL = process.env.REACT_APP_API_URL;

const Heading = styled.div`

  margin: 10px;

  & h1{
    margin: 0;
    font-size: 18px;
  }

  & span{
    color: gray;
    font-size: 12px;
  }
`;

const BlogContainer = styled.div`
  background-color: #ffffff;
  height: 550px;
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const BlogItems = styled.li`
  display: flex;
  list-style: none;
  padding: 2rem 0 ;

  & .content{
    display: flex;
    width: 80%
  }
`;

const BlogContent = styled.div`
  margin-left: 1rem;
  & p{
      color: gray;
      font-size: 12px;
    }

  & a{
    text-decoration: none;
    font-size: 16px;
    color: #000000;
    text-transform: capitalize;
    &:hover, :active{
      color: #000000;
    }
  }

  & .read-more{
    color: #397bf6;
    font-size: 12px;
    cursor: pointer;
  }

`;

const ActionButtons = styled.div`
  & a{
    border-radius: 2px;
    outline: none;
    border: none;
  }

  & button{
    background-color: #ffffff;
    padding: 4px;
    border-radius: 2px;
    outline: none;
    border: none;
    padding-top: px;
    margin-left: 10px;
    cursor: pointer;
  }
`

export const Blogs = () => {

    const [blogs, setBlogs ] = useState<Blog[]>([]);
    const [loading, setLoading ] = useState(true);

    useEffect(() => {
        (async () => {await getBlogs()})() ;
    },[]);

    const getBlogs = async () => {
        try{
            const randomUserId = Math.floor(Math.random() * 3) + 1;
            const response: any = await fetch(`${API_URL}/users/${randomUserId}/posts`);
            const blogs = await response.json(); 
            setBlogs(blogs);
        }
        catch(error){
          console.log("Error fetching posts", error);
        }
        finally{
          setLoading(false);
        }
    }

    // const handleDelete = async (postId: number) => {
    //     if (window.confirm("Are you sure you want to delete this post?")) {
    //       try {
    //         await fetch(`${API_URL}/posts/${postId}`, {
    //           method: "DELETE",
    //         });
    //         alert("Post deleted successfully!");
    //       } catch (error) {
    //         console.error("Error deleting post:", error);
    //       }
    //     }
    // };

    return (
        <div>
          <Heading>
            <h1>All Blogs posts</h1>
            <span>Qatar Development Bank</span>
          </Heading>
            {loading ? (
                <p>Loading posts...</p>
            ) : (
              <BlogContainer>

                <ul>
                  {blogs && blogs.map((blog) => (
                    <BlogItems key={blog.id}>
                      <div className="content">
                        <img src={`/blogs/${Math.floor(Math.random() * 3) + 1}.jpg`} width={100} />
                        <BlogContent>
                          <Link to={`/blogs/${blog.id}`}>
                            <h3>{blog.title}</h3>
                          </Link>
                          <p>{blog.content}</p>
                          <Link to={`/blogs/${blog.id}`}>
                            <p className="read-more">Read More</p>
                          </Link>
                        </BlogContent>
                      </div>
                    {
                      <ActionButtons>
                        <Link to={`/blogs/edit/${blog.id}`}>
                          <img src="/icons/edit.png" width={15} alt="edit"/>
                        </Link>
                        <button onClick={() =>{}}>
                          <img src="/icons/delete.png" width={15} alt="delete"/>
                        </button> 
                      </ActionButtons>
                    }
                  </BlogItems>
                  ))}
                </ul>
              </BlogContainer>
            )}
    </div>
    );
};

