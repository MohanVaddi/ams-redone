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
import React, { useRef, useState, useContext } from 'react';
import { Redirect } from 'react-router';
import DatePicker from 'react-datepicker';
import AppContext from '../context/AppContext';
import { Notification } from '../components/Notification';
interface FacultyHomeProps {}

export const FacultyUpdate: React.FC<FacultyHomeProps> = ({}) => {
    const { state, dispatch } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
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
    const [fromTime, setFromTime] = useState<any>('');
    const [toTime, setToTime] = useState<any>('');

    const fromTimeRef = useRef<HTMLInputElement>(null);
    const toTimeRef = useRef<HTMLInputElement>(null);
    const subjectRef = useRef<HTMLSelectElement>(null);
    const classRef = useRef<HTMLSelectElement>(null);
    const gmeetCodeRef = useRef<HTMLInputElement>(null);
    const handleDateSelect = (date: any) => {
        setStartDate(date);
    };
    const onFromTimeChangeHandler = () => {
        setFromTime(fromTimeRef.current?.value);
        console.log(fromTime);
    };
     const onToTimeChangeHandler = () => {
         setToTime(toTimeRef.current?.value);
         console.log(toTime);
     };

    const onFormSubmitHandler = () => {
        const data = {
            date: startDate,
            subject: subjectRef.current!.value,
            class: classRef.current!.value,
            fromTime: fromTime,
        };
        console.log(data);
        setIsLoading(() => {
            setTimeout(() => {
                setIsLoading(false);
            }, 3000);
            return true;
        });
    };

    if (state.user.isLoggedIn === false) {
        return <Redirect to='/' />;
    } else {
        return (
            <VStack padding={[5, 8, 12]} minH={'100vh'}>
                {isLoading && <Notification msg='loading' type='info' />}

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
                            <Input
                                ref={gmeetCodeRef}
                                textTransform='uppercase'
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={colspan}>
                        <FormControl>
                            <FormLabel>From Time</FormLabel>
                            <Input
                                ref={fromTimeRef}
                                type='time'
                                value={fromTime}
                                onChange={onFromTimeChangeHandler}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={colspan}>
                        <FormControl>
                            <FormLabel>To Time</FormLabel>
                            <Input
                                ref={toTimeRef}
                                type='time'
                                value={toTime}
                                onChange={onToTimeChangeHandler}
                            />
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
    }
};
