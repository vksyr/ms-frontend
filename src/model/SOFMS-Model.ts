/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface MtgApprovalCode {
  /** @format int32 */
  id?: number;
  createdBy?: string | null;

  /** @format date-time */
  createdOn?: string | null;
  modifiedBy?: string | null;

  /** @format date-time */
  modifiedOn?: string | null;
  name?: string | null;
  description?: string | null;
  isApproved?: boolean;

  /** @format int32 */
  displayIndex?: number;
}

export interface Country {
  /** @format int32 */
  id?: number;
  createdBy?: string | null;

  /** @format date-time */
  createdOn?: string | null;
  modifiedBy?: string | null;

  /** @format date-time */
  modifiedOn?: string | null;
  name?: string | null;
  code?: string | null;
  isActive: boolean;
  buildings?: Building[] | null;
}

export interface Site {
  /** @format int32 */
  id?: number;
  createdBy?: string | null;

  /** @format date-time */
  createdOn?: string | null;
  modifiedBy?: string | null;

  /** @format date-time */
  modifiedOn?: string | null;
  name?: string | null;
  isActive: boolean;
}

export interface Role {
  /** @format int32 */
  id?: number;
  name?: string | null;
  description?: string | null;

  /** @format int32 */
  parentRoleID?: number;

  /** @format int32 */
  moduleID?: number;

  /** @format int32 */
  sortOrder?: number;
  usersToRoles?: UsersToRole[] | null;
}

export interface UsersToRole {
  /** @format int32 */
  id?: number;

  /** @format int32 */
  moduleID?: number;

  /** @format int32 */
  instanceID?: number;

  /** @format int32 */
  resourceID?: number;

  /** @format int32 */
  roleID?: number;

  /** @format int32 */
  userID?: number;

  /** @format int32 */
  itemID?: number;
  adUserID?: string | null;
  createdBy?: string | null;

  /** @format date-time */
  createdOn?: string;
  modifiedBy?: string | null;

  /** @format date-time */
  modifiedOn?: string;
  role?: Role;
  user?: User;
}

export interface User {
  /** @format int32 */
  id?: number;
  createdBy?: string | null;

  /** @format date-time */
  createdOn?: string | null;
  modifiedBy?: string | null;

  /** @format date-time */
  modifiedOn?: string | null;

  /** @format int32 */
  domainConnectorID?: number | null;
  adUserID?: string | null;
  domain?: string | null;
  userName?: string | null;
  distinguishedName?: string | null;
  purge?: boolean;
  loginName?: string | null;
  displayName?: string | null;
  name?: string | null;
  commonName?: string | null;
  description?: string | null;
  lastName?: string | null;
  givenName?: string | null;
  middleInitial?: string | null;
  generationalQualifier?: string | null;
  rankTitle?: string | null;
  rankTitleCategoryText?: string | null;
  dodComponent?: string | null;
  dodSubComponent?: string | null;
  positionTitle?: string | null;
  employeeID?: string | null;
  mail?: string | null;
  smartCardLogonExemptionCode?: string | null;
  citizenshipStatus?: string | null;
  citizenshipCountryCode?: string | null;
  personnelCategoryCode?: string | null;
  businessPhoneCommercial?: string | null;
  mobilePhone?: string | null;
  businessPhoneDsnDutyPhone?: string | null;
  businessFaxNumberCommercial?: string | null;
  businessSecurePhoneNumber?: string | null;
  businessSecureFaxNumberDsn?: string | null;
  secureMobilePhoneNumber?: string | null;
  businessAddressStreet?: string | null;
  businessAddressCity?: string | null;
  businessAddressState?: string | null;
  businessAddressPostalCode?: string | null;
  businessAddressCountryCode?: string | null;
  doNotPublish?: string | null;
  organizationName?: string | null;
  officeSymbol?: string | null;
  bldgRmNumber?: string | null;
  manager?: string | null;
  userPrincipalName?: string | null;
  altSecurityIdentities?: string | null;

  /** @format date-time */
  validatedOn?: string;
  validatedBy?: string | null;
  isDisabled?: boolean;
  entityKey?: string | null;
  photoURL?: string | null;

  /** @format int32 */
  rankID?: number | null;
  ipPhone?: string | null;
  source?: string | null;
  usersToRoles?: UsersToRole[] | null;
  rooms?: MtgRoomMetadata[] | null;
}

export interface MtgClassification {
  /** @format int32 */
  id?: number;
  createdBy?: string | null;

  /** @format date-time */
  createdOn?: string | null;
  modifiedBy?: string | null;

  /** @format date-time */
  modifiedOn?: string | null;
  name?: string | null;
  menuText?: string | null;
  backgroundColor?: string | null;
  textColor?: string | null;

  /** @format int32 */
  displayIndex?: number;
  isActive?: boolean;
}

export interface MtgNetwork {
  /** @format int32 */
  id?: number;
  createdBy?: string | null;

  /** @format date-time */
  createdOn?: string | null;
  modifiedBy?: string | null;

  /** @format date-time */
  modifiedOn?: string | null;
  name?: string | null;

  /** @format int32 */
  displayIndex?: number;

  /** @format int32 */
  parentClassification?: number;
}

export interface MtgRoomNetwork {
  /** @format int32 */
  id?: number;
  createdBy?: string | null;

  /** @format date-time */
  createdOn?: string | null;
  modifiedBy?: string | null;

  /** @format date-time */
  modifiedOn?: string | null;

  /** @format int32 */
  networkID?: number;
  network?: MtgNetwork;

  /** @format int32 */
  roomID?: number;
  room?: MtgRoomMetadata;
}

export interface MtgRoomMetadata {
  /** @format int32 */
  id?: number;
  createdBy?: string | null;

  /** @format date-time */
  createdOn?: string | null;
  modifiedBy?: string | null;

  /** @format date-time */
  modifiedOn?: string | null;
  name?: string | null;
  description?: string | null;

  /** @format int32 */
  seats?: number | null;

  /** @format int32 */
  vtcType?: number | null;
  approvalRequired?: boolean | null;
  purge?: boolean | null;
  macAddress?: string | null;
  hostName?: string | null;
  ipAddress?: string | null;
  serialNumber?: string | null;
  isPublic?: boolean | null;
  isActive?: boolean | null;
  owners?: User[] | null;

  /** @format int32 */
  roomID?: number;
  room?: Room;

  /** @format int32 */
  classificationID?: number | null;
  classification?: MtgClassification;
  networks?: MtgRoomNetwork[] | null;
}

export interface Room {
  /** @format int32 */
  id?: number;
  createdBy?: string | null;

  /** @format date-time */
  createdOn?: string | null;
  modifiedBy?: string | null;

  /** @format date-time */
  modifiedOn?: string | null;
  name?: string | null;
  isActive: boolean;

  /** @format int32 */
  buildingID?: number;
  building?: Building;
  mtgRoom?: MtgRoomMetadata;
}

export interface Building {
  /** @format int32 */
  id?: number;
  createdBy?: string | null;

  /** @format date-time */
  createdOn?: string | null;
  modifiedBy?: string | null;

  /** @format date-time */
  modifiedOn?: string | null;
  name?: string | null;
  streetAddress?: string | null;
  city?: string | null;
  stateProvince?: string | null;
  postalCode?: string | null;
  isActive: boolean;

  /** @format int32 */
  countryID?: number;
  country?: Country;

  /** @format int32 */
  siteID?: number;
  site?: Site;
  rooms?: Room[] | null;
}

export interface MtgJDirectorate {
  /** @format int32 */
  id?: number;
  createdBy?: string | null;

  /** @format date-time */
  createdOn?: string | null;
  modifiedBy?: string | null;

  /** @format date-time */
  modifiedOn?: string | null;
  name?: string | null;

  /** @format int32 */
  displayIndex?: number;
}

export interface MtgEventParticipant {
  /** @format int32 */
  id?: number;
  createdBy?: string | null;

  /** @format date-time */
  createdOn?: string | null;
  modifiedBy?: string | null;

  /** @format date-time */
  modifiedOn?: string | null;

  /** @format uuid */
  mtgEventID?: string;
  event?: MtgEvent;

  /** @format int32 */
  userID?: number;
  participant?: User;
}

export interface MtgEvent {
  /** @format uuid */
  id?: string;
  createdBy?: string | null;

  /** @format date-time */
  createdOn?: string | null;
  modifiedBy?: string | null;

  /** @format date-time */
  modifiedOn?: string | null;
  title?: string | null;
  description?: string | null;
  notes?: string | null;
  justification?: string | null;
  isHost?: boolean | null;

  /** @format date-time */
  start?: string;

  /** @format date-time */
  end?: string;
  allDay?: boolean;

  /** @format int64 */
  recurrenceID?: number | null;
  recurrenceRule?: string | null;
  recurrenceException?: string | null;
  subSiteGUID?: string | null;
  subSiteURL?: string | null;
  purge?: boolean | null;
  isVtc?: boolean | null;

  /** @format int32 */
  vtcNetworkId?: number | null;
  externalPrimaryKey?: string | null;
  conferenceIsDeletedFlag?: boolean | null;

  /** @format int32 */
  approvalCodeID?: number;
  approvalCode?: MtgApprovalCode;

  /** @format int32 */
  roomID?: number;
  room?: Room;

  /** @format int32 */
  jDirectorateID?: number;
  jDirectorate?: MtgJDirectorate;

  /** @format int32 */
  classificationID?: number;
  classification?: MtgClassification;

  /** @format int32 */
  pocid?: number;
  poc?: User;
  participants?: MtgEventParticipant[] | null;
}

export interface Organization {
  /** @format int32 */
  id?: number;
  createdBy?: string | null;

  /** @format date-time */
  createdOn?: string | null;
  modifiedBy?: string | null;

  /** @format date-time */
  modifiedOn?: string | null;
  abbreviation?: string | null;
  name?: string | null;

  /** @format int32 */
  subComponentID?: number;

  /** @format int32 */
  siteID?: number | null;
  isActive: boolean;
}

export interface MtgRoomOwner {
  /** @format int32 */
  id?: number;
  createdBy?: string | null;

  /** @format date-time */
  createdOn?: string | null;
  modifiedBy?: string | null;

  /** @format date-time */
  modifiedOn?: string | null;

  /** @format int32 */
  userID?: number;
  owner?: User;

  /** @format int32 */
  roomID?: number;
  room?: MtgRoomMetadata;
}
