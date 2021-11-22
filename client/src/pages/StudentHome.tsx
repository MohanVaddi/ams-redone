import { FormControl } from '@chakra-ui/form-control';
import {
    GridItem,
    SimpleGrid,
    VStack,
    useBreakpointValue,
    FormLabel,
    Input,
    Select,
    Button,
} from '@chakra-ui/react';
import React, { useState, useContext, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AppContext from './../context/AppContext';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

interface StudentHomeProps {}

export const StudentHome: React.FC<StudentHomeProps> = () => {
    const { state } = useContext(AppContext);
    // const subjects = state.user.subjects;
    const colspan = useBreakpointValue({ base: 2, md: 1 });
    const [fromDate, setFromDate] = useState<Date>(new Date());
    const [toDate, setToDate] = useState<Date>(new Date());
    // const subjectRef = useRef<HTMLSelectElement>(null);

    const handleFromDateSelect = (date: any) => {
        setFromDate(date);
    };
    const handleToDateSelect = (date: any) => {
        setToDate(date);
    };

    const onsubitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            studentEmail: state.user.email,
            fromDate: fromDate,
            toDate: toDate,
            // subject: subjectRef.current?.value,
        };
        const accessToken = localStorage.getItem('accessToken');
        const resp = await axios.get('http://localhost:4000/api/studentHome', {
            headers: {
                'x-auth-token': `${accessToken}`,
            },
            params: data,
        });
        console.log(resp.data);
    };

    if (state.user.isLoggedIn === false) {
        return <Redirect to='/' />;
    } else {
        return (
            <form onSubmit={onsubitHandler}>
                <VStack padding={[5, 8, 12]} minH={'100vh'}>
                    <SimpleGrid columns={2} columnGap={3} rowGap={6} w='full'>
                        <GridItem colSpan={colspan}>
                            <FormControl>
                                <FormLabel>From</FormLabel>
                                <Input
                                    as={DatePicker}
                                    selected={fromDate}
                                    onSelect={handleFromDateSelect}
                                    dateFormat='dd/MM/yyyy'
                                />
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={colspan}>
                            <FormControl>
                                <FormLabel>To</FormLabel>
                                <Input
                                    as={DatePicker}
                                    selected={toDate}
                                    onSelect={handleToDateSelect}
                                    dateFormat='dd/MM/yyyy'
                                />
                            </FormControl>
                        </GridItem>
                        {/* <GridItem colSpan={colspan}>
                            <FormControl>
                                <FormLabel>Subject</FormLabel>
                                <Select ref={subjectRef}>
                                    {subjects &&
                                        subjects.map((subject, index) => (
                                            <option key={index} value={subject}>
                                                {subject}
                                            </option>
                                        ))}
                                </Select>
                            </FormControl>
                        </GridItem> */}
                        <GridItem colSpan={2}>
                            <Button variant='primary' type='submit' size='sm'>
                                View Attendance
                            </Button>
                        </GridItem>
                    </SimpleGrid>
                </VStack>
            </form>
        );
    }
};
