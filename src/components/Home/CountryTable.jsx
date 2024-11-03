import React from 'react';
import { Table, Spin } from 'antd';

const CountryTable = ({ countries, loading }) => {

  const columns = [
    {
      title: 'Flag',
      dataIndex: 'flag',
      render: (flag) => <img src={flag} alt="flag" style={{ width: 50, height: 30 }} />,
    },
    {
      title: 'Common Name',
      dataIndex: 'commonName',
      sorter: (a, b) => a.commonName.localeCompare(b.commonName),
      responsive: ['xxl',"xl","lg"]
    },
    {
      title: 'Official Name',
      dataIndex: 'officialName',
      sorter: (a, b) => a.officialName.localeCompare(b.officialName),
      responsive: ['xxl',"xl","lg"]
    },
    {
      title: 'Region',
      dataIndex: 'region',
      filters: [
        { text: 'Europe', value: 'Europe' },
        { text: 'Asia', value: 'Asia' },
        { text: 'Africa', value: 'Africa' },
        { text: 'Americas', value: 'Americas' },
        { text: 'Oceania', value: 'Oceania' },
        { text: 'Antarctic', value: 'Antarctic' },
      ],
      onFilter: (value, record) => record.region === value,
      sorter: (a, b) => a.region.localeCompare(b.region),
    },
    {
      title: 'Capital',
      dataIndex: 'capital',
      sorter: (a, b) => a.capital.localeCompare(b.capital),
      responsive: ['xxl',"xl","lg","md"]
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      render: (currency) => (
        <span>{currency ? `${currency.name} (${currency.symbol})` : 'N/A'}</span>
      ),
      sorter: (a, b) => (a.currency?.name || '').localeCompare(b.currency?.name || ''),
      responsive: ['xxl',"xl","lg"]
    },
    {
      title: 'Population',
      dataIndex: 'population',
      render: (pop) => <span>{pop.toLocaleString()}</span>,
      sorter: (a, b) => a.population - b.population,
      responsive: ['xxl',"xl","lg","md","sm"]
    },
  ];

  const dataSource = countries.map((country) => ({
    key: country.cca2,
    flag: country.flags.png,
    commonName: country.name.common,
    officialName: country.name.official,
    region: country.region,
    capital: country.capital.join(', '),
    currency: Object.values(country.currencies)[0],
    population: country.population,
  }));

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={{
        pageSize: 7,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100'],
      }}
      locale={{
        emptyText: loading ? <Spin /> : 'No Data Available'
      }}
      rowKey="key"
      className='mt-4'
      loading={loading}
    />
  );
};

export default CountryTable;
