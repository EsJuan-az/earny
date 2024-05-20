import { Avatar, Card } from '@mui/material';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { EarnyContext } from '../../context/EarnyContext';
const RecordCard = ({record}) => {
  const { auth } = useContext(EarnyContext);
  console.log(auth);
  return (
    <Card className={`text-white p-3 flex gap-3 items-center relative font-medium ${auth?.id == record.user_id ? 'bg-gray-900' : 'bg-black'}`}>
        <Avatar
            sx={{bgcolor: '#4E54C8'}}
            className="text-center cursor-pointer relative ">
            { record.user.name.split(' ').slice(0, 2).reduce((p, c) => p + c[0],'').toUpperCase() }
        </Avatar>
      {record.message}
      <span className='text-xs bottom-1 right-1 absolute font-light'>{new Date(record.created_at).toUTCString()}</span>
    </Card>
  );
};
RecordCard.propTypes = {
  record: PropTypes.object
};
export default RecordCard;