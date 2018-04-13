import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './index.less';
import moment from 'moment';
import { Table, Card, Button } from 'antd';

@connect(({ game_ad }) => ({
    game_ad,
}))
export default class GameAds extends Component {

    componentWillMount() {
        this.props.dispatch({ type: 'game_ad/query' })
    }

    handleTableChange = (pagination, filters, sorter) => {
        // onChange(pagination, filters, sorter);
    }

    toStore = () => {
        this.props.dispatch(routerRedux.push('/game_ad/store'))
    }

    render() {
        console.log(this.props)
        const { data: { list, pagination }, loading } = this.props.game_ad;

        const status = ['下架', '上架']; //解析显示

        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
            },
            {
                title: '广告链接',
                dataIndex: 'ad_url',
            },
            {
                title: '广告图',
                dataIndex: 'image_url',
                render: val => `${val}`,
            },
            {
                title: '状态',
                dataIndex: 'status',
                filters: [
                    {
                        text: status[0],
                        value: 0,
                    },
                    {
                        text: status[1],
                        value: 1,
                    },
                ],
                render(val) {
                    return status[val];
                },
            },
            {
                title: '添加时间',
                dataIndex: 'created_at',
                sorter: true,
                render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
            },
        ];

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            ...pagination,
        };

        return (
            <div className={styles.standardTable}>
                <Card bordered={false}>
                    <div className="">
                        <Button icon="plus" type="primary" onClick={this.toStore}>
                            新建
                        </Button>
                    </div>
                    <Table
                        loading={loading}
                        rowKey={record => record.id}
                        dataSource={list}
                        columns={columns}
                        pagination={paginationProps}
                        onChange={this.handleTableChange}
                    />
                </Card>
            </div>
        )
    }
}