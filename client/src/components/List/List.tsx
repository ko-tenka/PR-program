import React, { memo, useEffect } from 'react'
import Card from '../Card/Card'
import { IPost } from '../../types/types'
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { fetchPosts } from '../../redux/thunkActions';
// import { ContextAll } from '../../context/context'

export default memo(function List(): JSX.Element {
  // console.log('List')
  // const { cards }: NonNullable<IList> = useContext(ContextAll)

  const posts = useAppSelector((store) => store.taskSlice.todoList);
  console.log('В List на 13 строке', posts)
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      {posts.length && posts ?
        posts?.map((post: IPost) => 
        <Card post={post} key={post.id} />)
        :
        <h5>Постов нет</h5>
      }
    </div>
  )
})
