let state = {
    notebooks: [
        {
            notebookName: 'default',
            id: 1,
            notes: [
                {id: 1, title: 'title', updateTime: '2019'}
            ]
        }
    ],
    currentNotebook: 'default',
    //是否展示添加标签的对话框
    showAddTag: false,
    //添加一个笔记本时的状态：添加成功、笔记本已存在
    addNotebookResult: {
        resultCode: 200//结果码，200成功，400失败, 0不显示
    }
}