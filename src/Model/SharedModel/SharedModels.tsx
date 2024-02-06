export interface User {
    id? : string
    name: string;
    profileImage: string;
}

export interface Attachment {
    id: string;
    url: string;
    type: 'image' | 'video' | 'document'; // Add more types as needed
}

export interface Reply {
    id: string;
    user: User;
    message: string;
    date: Date;
    subReplies?: Reply[]; // Only one layer of nesting
}

export interface Post {
    id: string;
    title: string;
    description: string;
    user: User;
    postDate: Date;
    updateDate?: Date;
    attachments?: Attachment[];
    replies?: Reply[];
}