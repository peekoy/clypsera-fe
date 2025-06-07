'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function EditUserForm() {
  return (
    <Card className='mx-34 p-0'>
      <CardHeader className='bg-gradient-to-r from-[#4F959D]/78 to-[#4971A9]/78 text-white rounded-lg p-6 gap-0'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <CardTitle className='text-2xl font-bold'>Edit User</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className='space-y-2 pb-6'>
        <div>
          <label>Username</label>
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
        <div>
          <label>Password</label>
          <Input
            type='password'
            id=''
            name=''
            placeholder='Password'
            className='bg-gray-100 border-0'
            required
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <Input
            type='password'
            id=''
            name=''
            placeholder='Confirm Password'
            className='bg-gray-100 border-0 '
            required
          />
        </div>
        <div>
          <label>Role</label>
          <Select name=''>
            <SelectTrigger className='bg-gray-100 border-0 w-full cursor-pointer'>
              <SelectValue placeholder='Nurse' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='nurse'>Nurse</SelectItem>
              <SelectItem value='doctor'>Doctor</SelectItem>
              <SelectItem value='oralSurgeon'>Oral Surgeon</SelectItem>
              <SelectItem value='research'>Research</SelectItem>
              <SelectItem value='operator'>Operator</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='flex justify-center'>
          <Button className='mt-4 hover:bg-[#4971A9]/90 cursor-pointer w-50'>
            Update
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
