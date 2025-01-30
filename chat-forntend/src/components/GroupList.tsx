import { useEffect, useState } from 'react';
import axios from 'axios';
import { Group } from '@/types/index';


const GroupList = ({ onSelectGroup }: { onSelectGroup: (id: string) => void }) => {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await axios.get('/api/groups');
      setGroups(response.data);
    };

    fetchGroups();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Groups</h2>
      <ul className="space-y-2">
        {groups.map((group) => (
          <li
            key={group._id}
            onClick={() => onSelectGroup(group._id)}
            className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            {group.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;