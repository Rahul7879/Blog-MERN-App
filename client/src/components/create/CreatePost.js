import { Box, Button, FormControl, InputBase, TextareaAutosize } from '@mui/material'
import React, { useState , useEffect, useContext } from 'react'
import styled from '@emotion/styled'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useLocation , useNavigate } from 'react-router-dom';
import {DataContext} from '../context/DataProvider'
import {API} from '../../service/api'



const Container = styled(Box)`
margin: 50px 100px;
`;

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
  
})

const StyledFormControl = styled(FormControl)`
margin-top: 10px;
display: flex;
flex-direction: row;
`;

const InputField = styled(InputBase)`
flex: 1;
margin: 0 30px;
`;

const TextArea = styled(TextareaAutosize)`
width: 100%;
margin-top: 50px;
font-size: 18px;
border: none;

&:focus-visible {
outline: none;
}
`;

const InitialPost = {
  title: '',
  description:  '',
  picture: '',
  username: '',
  categories: '',
  createdDate: new Date()

}


const CreatePost = () => {
  const [post, setPost] = useState(InitialPost);
  const [file, setFile] = useState('');
  const {account} = useContext(DataContext)
  const location = useLocation();
  const navigate = useNavigate();
  const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHN0dWR5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60';
  
  useEffect(() => {
    const getImage = async () => { 
        if(file) {
            const data = new FormData();
            data.append("name", file.name);
            data.append("file", file);
            const response = await API.uploadFile(data);
            post.picture = response.data;
            
        }
    }
    getImage();
    post.categories = location.search?.split('=')[1] || 'All';
    post.username = account.username;
}, [file])

  const handleChange = (e)=>{

    setPost({  ...post , [e.target.name]: e.target.value})
  }

  const savePost =  async() =>{
   let response = await API.createPost(post);
   if(response.isSuccess){
    navigate('/');
   }
  }
  return (
    <Container>
    <Image src={url} alt="banner"/>
    <StyledFormControl>
    <label htmlFor='fileInput'>
    <AddCircleIcon/>
    </label>
    <input type='file'
    id='fileInput'
    style={{display: "none"}}
    onChange={(e) => setFile(e.target.files[0])}
    />

    <InputField placeholder='Title' name='title' onChange={(e) => handleChange(e)}/>
    <Button variant='contained' onClick={()=> savePost()}>Publish</Button>
    </StyledFormControl>
    <TextArea
    minRows={5}
    placeholder='Tell Your Story'
    name='description' onChange={(e) => handleChange(e)}
    />
    </Container>
  )
}

export default CreatePost