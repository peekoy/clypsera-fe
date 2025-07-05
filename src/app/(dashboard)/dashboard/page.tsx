'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import Image from 'next/image';
import { getChartData } from '@/lib/api/fetch-chart';

const chartConfig = {
  users: {
    label: 'Users',
    color: 'hsl(var(--chart-1))',
  },
  therapy: {
    label: 'Therapy Type',
    color: 'hsl(var(--chart-2))',
  },
  gender: {
    label: 'Gender',
    color: 'hsl(var(--chart-3))',
  },
};

export default function DashboardPage() {
  const [totalUsersChartData, setTotalUsersChartData] = useState<
    { role: string; users: number; fill: string }[]
  >([]);
  const [therapyChartData, setTherapyChartData] = useState<
    { name: string; value: number; fill: string }[]
  >([]);
  const [genderChartData, setGenderChartData] = useState<
    { name: string; value: number; fill: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Authentication token not found. Redirecting to login.');
        return;
      }

      const chartData = await getChartData(token);

      if (chartData) {
        // Proses data untuk Total Users Chart
        if (chartData.user && chartData.user.role) {
          const roleCounts = chartData.user.role;
          const colors = ['#90C7CD', '#487F85', '#4971A9', '#808080'];
          const formattedUsersData = Object.keys(roleCounts).map(
            (role, index) => ({
              role: role.charAt(0).toUpperCase() + role.slice(1), // Capitalize role
              users: roleCounts[role],
              fill: colors[index % colors.length],
            })
          );
          setTotalUsersChartData(formattedUsersData);
        }

        // Proses data untuk Therapy Type Chart
        if (chartData.chart_jenis_terapi) {
          const therapyColors = ['#4971A9', '#4F959D', '#8DCCD3'];
          const formattedTherapyData = chartData.chart_jenis_terapi.map(
            (item: any, index: number) => ({
              name: item.nama_terapi,
              value: item.jumlah_operasi,
              fill: therapyColors[index % therapyColors.length],
            })
          );
          setTherapyChartData(formattedTherapyData);
        }

        // Proses data untuk Gender Chart
        if (chartData.chart_jenis_kelamin) {
          const genderData = chartData.chart_jenis_kelamin;
          const genderMapping: { [key: string]: string } = {
            L: 'Men',
            P: 'Women',
          };
          const genderColors = ['#E4ADD4', '#4971A9'];
          const formattedGenderData = Object.keys(genderData).map(
            (key, index) => ({
              name: genderMapping[key] || key,
              value: genderData[key],
              fill: genderColors[index % genderColors.length],
            })
          );
          setGenderChartData(formattedGenderData);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className='relative p-6 space-y-6'>
      <Card className='z-10 bg-[#4971a9]/80 text-white overflow-hidden'>
        <CardContent className='p-6'>
          <div className='flex items-center justify-between mx-30'>
            <Image
              src='/doctor-with-phone.svg'
              alt=''
              width={0}
              height={0}
              className='absolute w-80 mb-10'
            />
            <div className='ml-100'>
              <h2 className='text-3xl font-bold mb-2'>Get Our App</h2>
              <p className='mb-4 max-w-md'>
                Download our new app from your appstore or playstore to get the
                service from your mobile
              </p>
              <Button
                variant='outline'
                className='bg-transparent text-white border-white hover:bg-white/90 cursor-pointer'
              >
                Learn more
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className='flex flex-col lg:flex-row gap-6'>
        <div className='flex-[2]'>
          <Card className='h-full shadow-sm border border-gray-200'>
            <CardHeader className='gap-0'>
              <CardTitle className='flex items-center justify-between text-lg font-medium text-gray-700'>
                Total Users
                <Button
                  variant='ghost'
                  size='sm'
                  className='text-gray-400 hover:text-gray-600 h-8 px-3'
                >
                  <span className='text-sm'>Get</span>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className='pt-0'>
              <ChartContainer config={chartConfig} className='h-[350px]'>
                <BarChart
                  data={totalUsersChartData}
                  margin={{ top: 20, right: 20, left: 20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray='3 3' stroke='#f1f5f9' />
                  <XAxis
                    dataKey='role'
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    height={80}
                    interval={0}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                    domain={[
                      0,
                      (dataMax: number) => Math.max(dataMax, 6), // Ensure y-axis is at least 6
                    ]}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                  />
                  <Bar dataKey='users' radius={[4, 4, 0, 0]} stroke='none'>
                    {totalUsersChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div className='flex-1 flex flex-col gap-6'>
          <Card className='flex-1 gap-0 shadow-sm border border-gray-200'>
            <CardHeader className='gap-0'>
              <CardTitle className='text-lg font-medium text-gray-700'>
                Patient data by type of therapy
              </CardTitle>
            </CardHeader>
            <CardContent className='pt-0 flex items-center'>
              <div className='space-y-2'>
                {therapyChartData.map((item) => (
                  <div key={item.name} className='flex items-center gap-3'>
                    <div
                      className='w-3 h-3 rounded-full flex-shrink-0'
                      style={{ backgroundColor: item.fill }}
                    />
                    <div className='text-sm'>
                      <span className='font-semibold text-gray-800'>
                        {item.value}
                      </span>
                      <p className='text-gray-600 ml-1'>{item.name}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className='flex-1 min-h-0'>
                <ChartContainer config={chartConfig} className='h-[160px]'>
                  <PieChart>
                    <Pie
                      data={therapyChartData}
                      cx='50%'
                      cy='50%'
                      innerRadius={35}
                      outerRadius={60}
                      paddingAngle={2}
                      dataKey='value'
                      nameKey='name'
                      stroke='none'
                    >
                      {therapyChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card className='flex-1 gap-0 shadow-sm border border-gray-200'>
            <CardHeader className='gap-0'>
              <CardTitle className='text-lg font-medium text-gray-700'>
                Patient data by gender
              </CardTitle>
            </CardHeader>
            <CardContent className='pt-0 flex-1 flex'>
              <div className='flex justify-center gap-6'>
                {genderChartData.map((item) => (
                  <div key={item.name} className='flex items-center gap-2'>
                    <div
                      className='w-3 h-3 rounded-full flex-shrink-0'
                      style={{ backgroundColor: item.fill }}
                    />
                    <div className='text-sm'>
                      <span className='font-semibold text-gray-800'>
                        {item.value}
                      </span>
                      <span className='text-gray-600 ml-1'>{item.name}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className='flex-1 min-h-0'>
                <ChartContainer config={chartConfig} className='h-[160px]'>
                  <PieChart>
                    <Pie
                      data={genderChartData}
                      cx='50%'
                      cy='50%'
                      outerRadius={60}
                      dataKey='value'
                      nameKey='name'
                      stroke='none'
                    >
                      {genderChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
