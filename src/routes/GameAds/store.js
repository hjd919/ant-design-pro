import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Input, Upload, Icon, message } from 'antd';
const FormItem = Form.Item
const Dragger = Upload.Dragger

@connect(({ game_ad }) => ({
    game_ad,
}))
@Form.create()
export default class GameAdsStore extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: 'form/submitRegularForm',
                    payload: values,
                });
            }
        });
    }

    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    render() {
        const { submitting } = this.props.game_ad
        const { getFieldDecorator, getFieldValue } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
                md: { span: 10 },
            },
        };

        const submitFormLayout = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 10, offset: 7 },
            },
        };

        return (
            <Card bordered={false}>
                <Form
                    onSubmit={this.handleSubmit}
                    hideRequiredMark
                    style={{ marginTop: 8 }}
                >
                    <FormItem
                        {...formItemLayout}
                        label="广告链接"
                    >
                        {getFieldDecorator('ad_url', {
                            rules: [{
                                required: true, message: '请输入广告链接',
                            }],
                        })(
                            <Input placeholder="必填" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="广告图"
                    >
                        <div className="dropbox">
                            {getFieldDecorator('image_url', {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile,
                            })(
                                <Upload.Dragger name="files" action="/upload.do">
                                    <p className="ant-upload-drag-icon">
                                        <Icon type="inbox" />
                                    </p>
                                    <p className="ant-upload-text">点击或者拖拽文件到这里上传</p>
                                    <p className="ant-upload-hint">只支持一个图片上传</p>
                                </Upload.Dragger>
                            )}
                        </div>
                    </FormItem>
                    <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                        <Button type="primary" htmlType="submit" loading={submitting}>
                            提交
                        </Button>
                    </FormItem>
                </Form>
            </Card>            
        )
    }
    
}