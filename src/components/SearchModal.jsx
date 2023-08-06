import { Box, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalContent, ModalOverlay, Spinner, Button , Text } from "@chakra-ui/react";

const SearchModal = ({searchInputRef , setSearchQuery , cities  , handleWeatherSearch , setShowMenu
, onClose , isOpen , showSearchSpinner 
}) => {



    return (
        <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <InputGroup>
                            <InputRightElement>
                                {showSearchSpinner ? <Spinner /> : null}
                            </InputRightElement>

                            <Input
                                type="text"
                                ref={searchInputRef}
                                placeholder="search for city ..."
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    console.log("problem solved");
                                }}
                                onChange={(e) =>
                                    setSearchQuery(e.target.value.toLowerCase())
                                }
                            />
                        </InputGroup>
                        <Box mt="10px">
                            {cities.map((city) => {
                                return (
                                    <Button
                                        w="100%"
                                        my="2px"
                                        key={city.id}
                                        onClick={() => {
                                            
                                            handleWeatherSearch(city);
                                            onClose();
                                            setShowMenu(false);
                                        }}
                                    >
                                        <Text>{city.city}</Text>
                                    </Button>
                                );
                            })}
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
    )
}

export default SearchModal ;
