import React from 'react';
import { Reply } from '../../../Model/SharedModel/SharedModels';
import { Avatar, Group, Text,  } from '@mantine/core';
import {Box} from '@mui/material';
import {showFormattedDate} from "../../../utils";
import './../index.css'
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {Stack} from "@mui/material";
interface RepliesListProps {
    replies?: Reply[];
}

const ReplyCard: React.FC<{ reply: Reply }> = ({ reply }) => (
    // <Box>
        <Grid container spacing={3}>
            <Grid item xs={2}>
                <Stack>{reply.user.name}</Stack>
                <Stack>{showFormattedDate(reply.date)}</Stack>
            </Grid>
            <Grid item xs={10}>
                <Typography >
                    {reply.message}
                </Typography>
            </Grid>
        </Grid>


    // </Box>
    // <Card withBorder>
    //     <Group>
    //         <Avatar className={'cust-img'} src={reply.user.profileImage} alt={reply.user.name} />
    //         <div>
    //             <Text>{reply.user.name}</Text>
    //             <Text size="xs">{reply.message}</Text>
    //             <Text size="xs">{showFormattedDate(reply.date)}</Text>
    //         </div>
    //     </Group>
    // </Card>
);

export const RepliesList: React.FC<RepliesListProps> = ({ replies }) => {
    return (
        <Box>
            {replies?.map((reply) => (
                <div key={reply.id}>
                    <ReplyCard reply={reply} />
                    <Box
                        sx={{maxWidth:"90%"}}
                    >
                        {reply.subReplies?.map((subReply) => (
                            <ReplyCard key={subReply.id} reply={subReply} />
                        ))}
                    </Box>
                </div>
            ))}
        </Box>
    );
};