import {  Box, Button, Divider, Heading, useToast   } from "@chakra-ui/react";
import {SlLocationPin} from "react-icons/sl";

const RecentLocations = ({handleWeatherSearch , sidebarMenu}) => {

    const toast = useToast();

    return (
        <Box m="0px 15px">
            <Box mt="30px">
                <Heading>Recent locations </Heading>
                <Divider m="10px 0px" />
                <Box mt="15px">
                    {localStorage.getItem("cities") !== null
                        ? JSON.parse(localStorage.getItem("cities")).map(
                              (item , index) => {
                                  return (
                                      <Button 
                                      onClick={() => {
                                        handleWeatherSearch(item);
                                        sidebarMenu(0) ;
                                        toast({
                                            title: `${item.city} weather applied`,
                                            status: "info",
                                            duration: 3000,
                                            isClosable: false,
                                        });
                                      }}
                                      leftIcon={<SlLocationPin />} m="4px 7px" key={index} style={{borderRadius : "14px"}} >

                                          {item.city}
                                      </Button>
                                  );
                              }
                          )
                        : null}
                </Box>
            </Box>
        </Box>
    );
};

export default RecentLocations;
