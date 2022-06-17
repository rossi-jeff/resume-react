import { gql } from '@apollo/client';

export const SHOW_REFERENCE_QUERY = gql`
	query ShowReferenceQuery($UUID: String!) {
		showReference(UUID: $UUID) {
			Id
			Name {
				First
				Middle
				Last
				Suffix
			}
			Address {
				Address
				Suite
				City
				State
				Zip
			}
			Title
			Company
			UUID
			Phones {
				Id
				Number
				Extension
			}
			Emails {
				Id
				Address
			}
			Comments {
				Id
				Message
			}
			Credentials {
				Username
			}
			Created
			Version
		}
	}
`;
