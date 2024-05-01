import './Card.css';
import { IPost } from '../../types/types';
import { useAppDispatch } from '../../redux/hook';
import { fetchDeletePost } from '../../redux/thunkActions';
// import { ContextAll } from '../../context/context'

export type PostPropsType = {
  post: IPost;
};

export default function Card({ post }: PostPropsType): JSX.Element {
  // console.log('Card')
  // const { delHandler } = useContext(ContextAll)
  const dispatch = useAppDispatch();

  const deleteHandler = async (): Promise<void> => {
    void dispatch(fetchDeletePost(post.id));
  };

  return (
    <div className="myCard">
      <img src="leopard.jpg" style={{ maxHeight: '130px' }} alt="leo" />
      {post.title ? <h3>{post.title}</h3> : <h3>Нет тайтла</h3>}
      {post.description ? <h3>{post.description}</h3> : <h3>Нет текста</h3>}
      {/* {post.check1 ? <h3>ДА</h3> : <h3>НЕТ</h3>} */}
      <button className='BtnCardDelete'  onClick={() => deleteHandler()}>Удалить</button>
    </div>
  );
}
