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
    // 是否为重命名状态
    rename: false,
    //是否展示添加标签的对话框
    showAddTag: false,
    //添加一个笔记本时的状态：添加成功、笔记本已存在
    addNotebookResult: {
        resultCode: 200//结果码，200成功，400失败, 0不显示
    }
}