import React, { FC } from 'react';
import './style.scss';

import SelectImages from '../../components/SelectImages/selectImages';

const MediaAdmin: FC = () => {
    return (
        <section className="media">
            <h1 className="title">Media</h1>
            <SelectImages onClose={() => {}} onValid={() => {}} onPage={true}/>
        </section>
    );
}

export default MediaAdmin;