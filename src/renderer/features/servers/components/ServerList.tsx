import { useEffect, useState } from 'react';
import { Button, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ServerResponse } from '../../../api/types';
import { useServers } from '../queries/useServers';
import { EditServerModal } from './EditServerModal';
import styles from './ServerList.module.scss';

export const ServerList = () => {
  const { data: servers } = useServers();
  const [editServerModal, editServerHandlers] = useDisclosure(false);
  const [opened, setOpened] = useState(false);

  const [selectedServer, setSelectedServer] = useState<
    ServerResponse | undefined
  >();

  const handleClickServer = (server: ServerResponse) => {
    setSelectedServer(server);
    editServerHandlers.open();
  };

  const handleKeyDownServer = (
    e: React.KeyboardEvent<HTMLDivElement>,
    server: ServerResponse
  ) => {
    if (e.key === ' ' || e.key === 'Enter') {
      setSelectedServer(server);
      editServerHandlers.open();
    }
  };

  const handleCloseModal = () => {
    setOpened(false);
    editServerHandlers.close();
  };

  useEffect(() => {
    if (editServerModal === true) {
      setTimeout(() => setOpened(true));
    } else {
      setTimeout(() => setSelectedServer(undefined), 100);
    }
  }, [editServerModal]);

  return (
    <>
      {servers &&
        servers.data.map((server) => (
          <>
            <div
              className={styles.item}
              role="button"
              tabIndex={0}
              onClick={() => handleClickServer(server)}
              onKeyDown={(e) => handleKeyDownServer(e, server)}
            >
              <div>
                {server.name}
                <Text>Hello</Text>
              </div>
              <Button onClick={() => editServerHandlers.toggle()}>Edit</Button>
            </div>
            {selectedServer && (
              <EditServerModal
                opened={opened}
                server={selectedServer}
                onClose={handleCloseModal}
              />
            )}
          </>
        ))}
    </>
  );
};
