import {
    Box,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Spinner,
    Button,
    Text,
} from "@chakra-ui/react";

const SearchModal = ({
    searchInputRef,
    setSearchQuery,
    cities,
    handleWeatherSearch,
    setShowMenu,
    onClose,
    isOpen,
    showSearchSpinner,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" >
            <ModalOverlay />
            <ModalContent style={{borderRadius : "15px"}} p="10px 5px">
                <ModalBody >
                    <InputGroup>
                        <InputRightElement>
                            {showSearchSpinner ? <Spinner /> : null}
                        </InputRightElement>

                        <Input
                        style={{border : "none"}}
                            type="text"
                            variant="flushed"
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
                                    variant="ghost"
                                    key={city.id}
                                    onClick={() => {
                                        handleWeatherSearch(city);
                                        onClose();
                                        setShowMenu(false);
                                    }}
                                >
                                    <Text fontWeight="350">{city.city}</Text>
                                </Button>
                            );
                        })}
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default SearchModal;
