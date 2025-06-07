'use client';

import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function RequestData() {
  const [reqData, setReqData] = useState(true);
  return (
    <>
      {reqData ? (
        <Card className='gap-4'>
          <CardHeader className='text-center primary-color gap-0 font-bold text-3xl'>
            Data Use Request Form
          </CardHeader>
          <CardContent className='space-y-2'>
            <div>
              <label>Applicant's full name</label>
              <Input
                id=''
                name=''
                placeholder='Name'
                className='bg-gray-100 border-0'
                disabled
              />
            </div>
            <div>
              <label>Email</label>
              <Input
                id=''
                name=''
                placeholder='Email'
                className='bg-gray-100 border-0'
                disabled
              />
            </div>
            <div className='flex justify-between'>
              <div>
                <label>Mobile Phone number</label>
                <Input
                  id=''
                  name=''
                  placeholder='Number'
                  className='bg-gray-100 border-0 w-100'
                  disabled
                />
              </div>
              <div>
                <label>NIK</label>
                <Input
                  id=''
                  name=''
                  placeholder='NIK'
                  className='bg-gray-100 border-0 w-100'
                  disabled
                />
              </div>
            </div>
            <div className='flex justify-between'>
              <div>
                <label>Submission Categories</label>
                <Input
                  id=''
                  name=''
                  placeholder='Research'
                  className='bg-gray-100 border-0 w-100'
                  disabled
                />
              </div>
              <div>
                <label>Purpose of application</label>
                <Input
                  id=''
                  name=''
                  placeholder=''
                  className='bg-gray-100 border-0 w-100'
                  disabled
                />
              </div>
            </div>
            <Card className='bg-[#4F959D]/11 border-none shadow-none p-4 gap-2 mt-6 w-100 text-sm'>
              <p>Status: Pending</p>
              <p>Submission Date: 11 Jul 205 20:31:31</p>
              {/* tetep id user */}
              <p>Requested Operation ID: Data ID-16</p>
            </Card>
            <div className='space-x-4'>
              <Button className='mt-4 bg-[#93BBF3] hover:bg-[#93BBF3]/90 cursor-pointer w-50'>
                Approve Request
              </Button>
              <Button className='hover:bg-[#4971A9]/90 cursor-pointer w-50'>
                Reject Request
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className='gap-4'>
          <CardHeader className='text-center primary-color gap-0 font-bold text-3xl'>
            Data Use Request Form
          </CardHeader>
          <CardContent className='space-y-2'>
            <div>
              <label>Applicant's full name</label>
              <Input
                id=''
                name=''
                placeholder='Name'
                className='bg-gray-100 border-0'
                required
              />
            </div>
            <div>
              <label>Email</label>
              <Input
                id=''
                name=''
                placeholder='Email'
                className='bg-gray-100 border-0'
                required
              />
            </div>
            <div className='flex justify-between'>
              <div>
                <label>Mobile Phone number</label>
                <Input
                  id=''
                  name=''
                  placeholder='Number'
                  className='bg-gray-100 border-0 w-100'
                  required
                />
              </div>
              <div>
                <label>NIK</label>
                <Input
                  id=''
                  name=''
                  placeholder='NIK'
                  className='bg-gray-100 border-0 w-100'
                  required
                />
              </div>
            </div>
            <div>
              <label>Submission Categories</label>
              <Select name=''>
                <SelectTrigger className='bg-gray-100 border-0 w-full cursor-pointer'>
                  <SelectValue placeholder='Research' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='research'>Research</SelectItem>
                  <SelectItem value='komersil'>Komersil</SelectItem>
                  <SelectItem value='lainnya'>Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label>Purpose of application</label>
              <Textarea
                id='followUp'
                name='followUp'
                placeholder='Please fill in the purpose'
                className='bg-gray-100 border-0 min-h-[120px] text-sm'
                required
              />
            </div>
            <div className='flex justify-center'>
              <Button className='mt-4 cursor-pointer w-50'>Submit</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
