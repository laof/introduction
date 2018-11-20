import * as dialog from 'bootstrap-dialog';
class bootstrapDialog {
    public dialog: any = dialog;
    alert(message: string) {
        this.dialog.show({
            title: '系统消息',
            message: message,
            buttons: [{
                label: '确定',
                action: (dialog) => {
                    dialog.close();
                }
            }]
        });
    }
}

export default new bootstrapDialog();