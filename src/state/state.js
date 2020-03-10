let state = {
    notebooks: [
        {
            name: 'default',
            notebookId: 1,
            notes: [
                /**
                 * 笔记的状态，0表示这条笔记是本地新建的，此时id为undefined
                 */
                {noteId: 1, title: 'title', status: 0, select: false}
            ],
            /**
             * 笔记本中笔记列表的状态，0表示未获取笔记列表
             */
            status: 0,
            /**
             * 是否选中
             */
            select: false,
        }
    ],
    // 系统的状态
    status: {
        // 侧边栏显示或隐藏
        sider: 'open', // or 'close'
        // 当前是否是重命名状态，如果是，则选中的笔记本展示为一个文本框
        rename: false,
        // 新建笔记本的对话框显示或隐藏
        addNotebookDialog: 'close', // or 'open'
    },
    addNotebookResult: {
        resultCode: 200//结果码，200成功，400失败, 0不显示
    }
}