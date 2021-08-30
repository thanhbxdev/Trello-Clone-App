export const initialData = {
    boards: [
        {
            id: 'board-1',
            columnOrder: [
                'column-1',
                'column-2',
                'column-3'
            ],
            columns: [
                {
                    id: 'column-1',
                    boardId: 'board-1',
                    title: 'Todo column',
                    cardOrder: ['card-1', 'card-2', 'card-3', 'card-4', 'card-5', 'card-6', 'card-7',],
                    card: [
                        {
                            id: 'card-1',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: 'Title of card 1',
                            cover: "https://scontent.fhan4-1.fna.fbcdn.net/v/t1.6435-9/218133587_1481014082276501_6334431849146583714_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=174925&_nc_ohc=Hf71WAQ0WSoAX_I2t3P&_nc_ht=scontent.fhan4-1.fna&oh=61597d2e91760b79e30b1b1dbfa7e247&oe=614C9B19"
                        },
                        {id: 'card-2', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 2', cover: null},
                        {id: 'card-3', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 3', cover: null},
                        {id: 'card-4', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 4', cover: null},
                        {id: 'card-5', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 5', cover: null},
                        {id: 'card-6', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 6', cover: null},
                        {id: 'card-7', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 7', cover: null},
                    ]
                },
                {
                    id: 'column-2',
                    boardId: 'board-1',
                    title: 'Progress column',
                    cardOrder: ['card-8', 'card-9', 'card-10',],
                    card: [
                        {id: 'card-8', boardId: 'board-1', columnId: 'column-2', title: 'Title of card 8', cover: null},
                        {id: 'card-9', boardId: 'board-1', columnId: 'column-2', title: 'Title of card 9', cover: null},
                        {id: 'card-10', boardId: 'board-1', columnId: 'column-2', title: 'Title of card 10', cover: null},
                    ]
                },
                {
                    id: 'column-3',
                    boardId: 'board-1',
                    title: 'Done column',
                    cardOrder: ['card-11', 'card-12', 'card-13',],
                    card: [
                        {id: 'card-11', boardId: 'board-1', columnId: 'column-2', title: 'Title of card 11', cover: null},
                        {id: 'card-12', boardId: 'board-1', columnId: 'column-2', title: 'Title of card 12', cover: null},
                        {id: 'card-13', boardId: 'board-1', columnId: 'column-2', title: 'Title of card 13', cover: null},
                    ]
                }
            ]
        }
    ],

}