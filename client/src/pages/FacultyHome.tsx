import { FormControl } from '@chakra-ui/form-control';
import AppContext from '../context/AppContext';
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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Redirect } from 'react-router-dom';
interface FacultyHomeProps {}

export const FacultyHome: React.FC<FacultyHomeProps> = () => {
    const { state } = useContext(AppContext);

    const subjects = state.user.subjects;
    const classes = state.user.classes;
    const colspan = useBreakpointValue({ base: 2, md: 1 });
    const [fromDate, setFromDate] = useState<Date>(new Date());
    const [toDate, setToDate] = useState<Date>(new Date());
    const subjectRef = useRef<HTMLSelectElement>(null);
    const classRef = useRef<HTMLSelectElement>(null);

    const handleFromDateSelect = (date: any) => {
        setFromDate(date);
    };
    const handleToDateSelect = (date: any) => {
        setToDate(date);
    };

    const onFormSubmitHandler = () => {
        const data = {
            fromDate: fromDate.toLocaleDateString('en-GB'),
            toDate: toDate.toLocaleDateString('en-GB'),
            subject: subjectRef.current!.value,
            class: classRef.current!.value,
        };
        console.log(data);
    };

    if (state.user.isLoggedIn === false) {
        return <Redirect to='/' />;
    } else {
        return (
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
