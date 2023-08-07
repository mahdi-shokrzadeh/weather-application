import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";

const DetailedForecast = ({currentWeather , filteredForecast , sidebarColor}) => {
    return(
        <Box m="0px 15px">
            <Heading mt="20px" mb="15px">
                Detailed forecast of {currentWeather.name}
            </Heading>
            <Box mt="30px" p="0 50px">
                <Accordion allowMultiple>
                    {filteredForecast.map((item) => {
                        return (
                            <AccordionItem
                                m="12px 0px"
                                style={{ borderRadius: "10px" }}
                                key={item.id}
                                bg={sidebarColor}
                            >
                                <h2>
                                    <AccordionButton>
                                        <Box
                                            as="span"
                                            flex="1"
                                            textAlign="left"
                                        >
                                            <Text as="p">
                                                {item.dt_txt
                                                    .split(" ")[0]
                                                    .split("-")
                                                    .join(" / ")}
                                            </Text>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <Box mb="20px">
                                        <Flex
                                            justifyContent="center"
                                            alignContent="center"
                                        >
                                            <Image
                                                src={`../assets/weatherImages/${item.weather[0].icon}.png`}
                                                mr="10px"
                                            />
                                            <Flex
                                                direction="column"
                                                align="center"
                                                justifyContent="center"
                                            >
                                                <Text>
                                                    {item.weather[0].main}
                                                </Text>
                                                <Text>
                                                    {parseInt(item.main.temp) -
                                                        273}{" "}
                                                    °C
                                                </Text>
                                            </Flex>
                                        </Flex>
                                        <SimpleGrid minChildWidth="200px">
                                            <Flex
                                                direction="column"
                                                alignItems="center"
                                            >
                                                <Text>
                                                    - Description :{" "}
                                                    {
                                                        item.weather[0]
                                                            .description
                                                    }
                                                </Text>
                                                <Text>
                                                    - Wind speed :{" "}
                                                    {item.wind.speed} m/s
                                                </Text>
                                                <Text>
                                                    - Wind direction :{" "}
                                                    {item.wind.deg}°
                                                </Text>
                                            </Flex>
                                            <Flex
                                                direction="column"
                                                alignItems="center"
                                            >
                                                <Text>
                                                    - Humidity :{" "}
                                                    {parseInt(
                                                        item.main.humidity
                                                    )}
                                                    %
                                                </Text>
                                                <Text>
                                                    - Visibility :{" "}
                                                    {parseInt(item.visibility) /
                                                        1000}{" "}
                                                    km
                                                </Text>
                                                <Text>
                                                    - Air pressure :{" "}
                                                    {parseInt(
                                                        item.main.pressure
                                                    ) / 1000}{" "}
                                                    atm
                                                </Text>
                                            </Flex>
                                        </SimpleGrid>
                                    </Box>
                                </AccordionPanel>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </Box>
        </Box>
    );
};

export default DetailedForecast;
