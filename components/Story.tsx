interface Props {
  img?: string;
  username?: string;
}

const Story: React.FC<Props> = ({ img, username }) => {
  return (
    <div>
      <img
        className='h-14 w-14 rounded-full p-[1.5px] border-2 border-red-500 cursor-pointer hover:scale-110 transition duration-200 ease-out'
        src={img}
        alt={username}
      />
      <p className='text-xs w-14 truncate text-center'>{username}</p>
    </div>
  );
};

export default Story;
