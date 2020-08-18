import React, { useState, useEffect } from 'react';
import { TextInput, Button, Box, Icon } from '@rocket.chat/fuselage';
import { useMutableCallback } from '@rocket.chat/fuselage-hooks';

import Page from '../../../../client/components/basic/Page';
import { useTranslation } from '../../../../client/contexts/TranslationContext';
import { GenericTable } from '../../../../client/components/GenericTable';
import { useRoute } from '../../../../client/contexts/RouterContext';


const FilterByText = ({ setFilter, ...props }) => {
	const t = useTranslation();
	const [text, setText] = useState('');

	const handleChange = useMutableCallback((event) => setText(event.currentTarget.value));
	const onSubmit = useMutableCallback((e) => e.preventDefault());

	useEffect(() => {
		setFilter({ text });
	}, [setFilter, text]);
	return <Box mb='x16' is='form' onSubmit={onSubmit} display='flex' flexDirection='column' {...props}>
		<TextInput flexShrink={0} placeholder={t('Search')} addon={<Icon name='magnifier' size='x20'/>} onChange={handleChange} value={text} />
	</Box>;
};


function PrioritiesPage({
	data,
	header,
	setParams,
	params,
	title,
	renderRow,
	children,
}) {
	const t = useTranslation();

	const prioritiesRoute = useRoute('omnichannel-priorities');

	const handleClick = useMutableCallback(() => prioritiesRoute.push({
		context: 'new',
	}));

	return <Page flexDirection='row'>
		<Page>
			<Page.Header title={title}/>
			<Page.Content>
				<GenericTable FilterComponent={FilterByText} header={header} renderRow={renderRow} results={data && data.priorities} total={data && data.total} setParams={setParams} params={params} />
				<Box display='flex' width='100%' justifyContent='end' padding='x8' mbe='x4'>
					<Button onClick={handleClick} mis='x8' primary>{t('New_Priority')}</Button>
				</Box>
			</Page.Content>
		</Page>
		{children}
	</Page>;
}

export default PrioritiesPage;