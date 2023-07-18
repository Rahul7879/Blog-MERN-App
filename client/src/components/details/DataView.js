import { Box, Typography } from '@mui/material'
import React, {useEffect, useState, useContext} from 'react'
import { useParams, Link , useNavigate} from 'react-router-dom'
import { API } from '../../service/api'
import styled from '@emotion/styled'
import {Edit, Delete} from '@mui/icons-material'
import { DataContext } from '../context/DataProvider'
import Comments from '../comments/Comments'



// const Container = styled(Box)(({theme})=>({
// margin: '100px 100px',
// [theme.breakpoints.down('md')]: {
//   margin: 0
// } 
// }));
const Container = styled(Box)`
margin: 50px 100px;
`;

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
})

const Title = styled(Typography)`
font-size: 38px;
font-weight: 600;
text-align: center;
margin : 50px 0 10px 0;
word-break: break-word;
`;

const EditIcon = styled(Edit)`
margin: 5px;
padding: 5px;
border : 1px solid #878787;
border-radius: 10px;
`;
const DeleteIcon = styled(Delete)`
margin: 5px;
padding: 5px;
border : 1px solid #878787;
border-radius: 10px;
color: error;
`;
const Author = styled(Box)`
color: #878787;
margin: 20px 0;
display: flex;

`;

const Desc = styled(Typography)`
word-break: break-word;
`;
const DataView = () => {
    const [post, setPost] = useState({});
    const {account} = useContext(DataContext);

    const {id} = useParams();
    const navigate = useNavigate();
    const url =post.picture? post.picture : 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'
    useEffect(()=>{
        const fetchData = async()=>{
          let response = await API.getPostById(id);
          if(response.isSuccess){
            setPost(response.data);
          }
        }
        fetchData();
    }, [])

    const deleteBlog = async ()=>{
      let response = await API.deletePost(post._id);
      if(response.isSuccess){
           navigate('/');
      }
    }
  return (
   <Container>
   <Image src={url}/>
   <Box style= {{float: "right"}}>
   {
     account.username === post.username &&
    <>
    <Link to={`/update/${post._id}`}>
    <EditIcon color='primary'/>
    </Link>
    <DeleteIcon color='error' onClick={()=> deleteBlog()}/>
    </>
   }
   </Box>
   <Title> {post.title}</Title>
   <Author>
   <Typography>Author : <Box component="span" style={{fontWeight: 600}}>{post.username}</Box></Typography>
   T<Typography style={{marginLeft: "auto"}}>{new Date(post.createdDate).toDateString() }</Typography>
   </Author>
   <Desc>{post.description}</Desc>

   <Comments post = {post}/>
   </Container>
  )
}

export default DataView