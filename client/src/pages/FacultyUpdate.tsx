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
import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';

import { Notification } from '../components/Notification';

interface FacultyHomeProps {}

export const FacultyUpdate: React.FC<FacultyHomeProps> = ({}) => {
    const subjects = ['AI', 'ML', 'ACC', 'IR', 'DIP'];
    const classes = [
        'CSE-06',
        'CSE-01',
        'CSE-02',
        'CSE-03',
        'CSE-04',
        'CSE-05',
    ];
    const colspan = useBreakpointValue({ base: 2, md: 1 });
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [fromTime, setFromTime] = useState('');

    const subjectRef = useRef<HTMLSelectElement>(null);
    const classRef = useRef<HTMLSelectElement>(null);
    const gmeetCodeRef = useRef<HTMLInputElement>(null);
    const handleDateSelect = (date: any) => {
        setStartDate(date);
    };

    const onFormSubmitHandler = () => {
        const data = {
            date: startDate,
            subject: subjectRef.current!.value,
            class: classRef.current!.value,
            fromTime: fromTime,
        };
        console.log(data);
    };

    return (
        <VStack padding={[5, 8, 12]} minH={'100vh'}>
            <SimpleGrid columns={2} columnGap={3} rowGap={6} w='full'>
                <GridItem colSpan={colspan}>
                    <FormControl>
                        <FormLabel>Date</FormLabel>
                        <Input
                            as={DatePicker}
                            selected={startDate}
                            onSelect={handleDateSelect}
                            dateFormat='dd/MM/yyyy'
                        />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={colspan}>
                    <FormControl>
                        <FormLabel>GMEET CODE</FormLabel>
                        <Input ref={gmeetCodeRef} textTransform='uppercase' />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={colspan}>
                    <FormControl>
                        <FormLabel>From Time</FormLabel>
                        <Input />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={colspan}>
                    <FormControl>
                        <FormLabel>To Time</FormLabel>
                        <Input />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={colspan}>
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
                </GridItem>
                <GridItem colSpan={colspan}>
                    <FormControl>
                        <FormLabel>Class</FormLabel>
                        <Select ref={classRef}>
                            {classes &&
                                classes.map((classVal, index) => (
                                    <option key={index} value={classVal}>
                                        {classVal}
                                    </option>
                                ))}
                        </Select>
                    </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                    <Button
                        variant='primary'
                        size='sm'
                        onClick={onFormSubmitHandler}>
                        View Attendance
                    </Button>
                </GridItem>
            </SimpleGrid>
        </VStack>
    );
};
