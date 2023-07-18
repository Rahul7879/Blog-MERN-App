
import { Box, Button, TextareaAutosize,styled } from '@mui/material'
import React, { useState , useContext , useEffect } from 'react'
import { DataContext } from '../context/DataProvider';
import { API } from '../../service/api';
import Comment from './Comment';

const Container = styled(Box)`
margin-top: 100px;
display: flex;

`;

const Image = styled('img')({
    width: 50,
    height:50,
    borderRadius: '50%'
})

const TextArea = styled(TextareaAutosize)`
 height: 100px;
 width: 100%;
 margin: 0 20px;
`;


const initialValues = {
   name: '',
   postId: '',
   comment: '',
   date: new Date()

}
const Comments = ({post}) => {
   const [comment, setComment] =  useState(initialValues);
   const [comments, setComments] =  useState([]);
   const [toggle, setToggle]= useState(false);

   const{account}  = useContext(DataContext);
    const url = 'https://cdn-icons-png.flaticon.com/512/21/21104.png';

    useEffect(()=>{
         const getData = async ()=>{
         const res =  await  API.getAllComments(post._id);
         if(res.isSuccess){
                 setComments(res.data);
         }
         }
         getData();
    },[post, toggle])


    const handleChange = (e)=>{
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comment: e.target.value
        })
        
    }

    const AddComment = async(e)=>{
       let response = await API.newComment(comment);
       if(response.isSuccess){
        setComment(initialValues);
       }
       setToggle(prevState=> !prevState);
    }
  return (
      <Box>
      <Container>
      <Image src={url} alt='Dp' />
      <TextArea 
      minRows={5}
      placeholder='write comment'
      value={comment.comment}
      onChange={(e)=>handleChange(e)}
      />
      <Button variant="contained"
       color="primary" size="medium"
        style={{height: "40px"}}
        onClick={(e)=>AddComment(e)}>Post</Button>
      </Container>
    <Box>{

        comments && comments.length > 0 && comments.map(comment => (
            <Comment key={comment._id} comment = {comment} setToggle={setToggle}/>
        ))
    }
    </Box>
    </Box>
  )
}

export default Comments