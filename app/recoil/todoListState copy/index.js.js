import { atom } from "recoil";

const something = atom({
    key: 'something',
    default: [
        { id: 1, name: 'Learn Recoil', priority: 'High'},
        { id: 2, name: 'Learn Redux', priority: 'Medium'},
        { id: 3, name: 'Learn NextJs', priority: 'Low'}
    ]
});

export default something;